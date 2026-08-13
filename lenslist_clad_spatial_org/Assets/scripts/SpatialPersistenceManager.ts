interface GeneralDataStoreAPI {
    putString: (key: string, value: string) => void;
    getString: (key: string) => string | null;
    remove: (key: string) => void;
}

declare const GeneralDataStore: GeneralDataStoreAPI | undefined;

export interface TaskOrbStateData {
    orbName: string;
    priorityMass: number;
    isCompleted: boolean;
    position: [number, number, number];
}

export interface SpatialMatrixPersistentData {
    clusterName: string;
    focusDurationMinutes: number;
    tasks: TaskOrbStateData[];
    savedTimestamp: string;
}

/**
 * SpatialPersistenceManager
 * Manages session persistence for the Gravitational Kinetic Spatial Task Matrix
 * using Lens Studio GeneralDataStore.
 */

@component
export class SpatialPersistenceManager extends BaseScriptComponent {
    @input
    persistenceKey = "SpatialMatrix_State_V1";

    @input
    autoSaveOnExit = true;

    @input
    autoLoadOnStart = true;

    private inMemoryStore: Map<string, string> = new Map();
    public isInitialized = false;

    private getDataStore(): GeneralDataStoreAPI | null {
        if (typeof GeneralDataStore !== "undefined" && GeneralDataStore) {
            return GeneralDataStore;
        }
        const gStore = (
            globalThis as unknown as {
                GeneralDataStore?: GeneralDataStoreAPI;
            }
        ).GeneralDataStore;
        return gStore || null;
    }

    public onAwake(): void {
        this.isInitialized = true;
        print(`[SpatialPersistenceManager] Initialized with Key: '${this.persistenceKey}'`);
        if (this.autoLoadOnStart) {
            this.loadState();
        }
    }

    /**
     * Serializes current spatial matrix state into JSON string
     */
    public serializeState(clusterName: string, focusDurationMinutes: number, tasks: TaskOrbStateData[]): string {
        const payload: SpatialMatrixPersistentData = {
            clusterName,
            focusDurationMinutes,
            tasks,
            savedTimestamp: new Date().toISOString(),
        };

        return JSON.stringify(payload);
    }

    /**
     * Saves matrix state to storage
     */
    public saveState(clusterName: string, focusDurationMinutes: number, tasks: TaskOrbStateData[]): boolean {
        try {
            const jsonString = this.serializeState(clusterName, focusDurationMinutes, tasks);
            const store = this.getDataStore();

            if (store) {
                store.putString(this.persistenceKey, jsonString);
            } else {
                this.inMemoryStore.set(this.persistenceKey, jsonString);
            }

            print(`[SpatialPersistenceManager] State saved successfully. (${tasks.length} task nodes persisted)`);
            return true;
        } catch (error) {
            print(`[SpatialPersistenceManager] Failed to save state: ${error}`);
            return false;
        }
    }

    /**
     * Loads matrix state from storage
     */
    public loadState(): SpatialMatrixPersistentData | null {
        try {
            let jsonString: string | null = null;
            const store = this.getDataStore();

            if (store) {
                jsonString = store.getString(this.persistenceKey);
            } else {
                jsonString = this.inMemoryStore.get(this.persistenceKey) || null;
            }

            if (!jsonString) {
                print(`[SpatialPersistenceManager] No saved state found for Key: '${this.persistenceKey}'`);
                return null;
            }

            const data: SpatialMatrixPersistentData = JSON.parse(jsonString);
            print(`[SpatialPersistenceManager] State loaded cleanly: Cluster '${data.clusterName}'`);
            return data;
        } catch (error) {
            print(`[SpatialPersistenceManager] Error parsing saved state JSON: ${error}`);
            return null;
        }
    }

    /**
     * Clears persisted state
     */
    public clearState(): void {
        const store = this.getDataStore();
        if (store) {
            store.remove(this.persistenceKey);
        }
        this.inMemoryStore.delete(this.persistenceKey);
        print(`[SpatialPersistenceManager] State cleared for Key: '${this.persistenceKey}'`);
    }
}

// BuildSync: 2026-08-13T19:15:39.362Z
