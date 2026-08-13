import { beforeEach, describe, expect, it } from "vitest";
import { SpatialCategoryClusterSwitcher } from "../scripts/SpatialCategoryClusterSwitcher";

describe("🌌 SpatialCategoryClusterSwitcher Component Tests", () => {
    let switcher: SpatialCategoryClusterSwitcher;

    beforeEach(() => {
        switcher = new SpatialCategoryClusterSwitcher();
    });

    it("should initialize with default WORK category", () => {
        expect(switcher).toBeDefined();
        expect(switcher.getActiveCategory()).toBe("WORK");
    });

    it("should switch active category cleanly", () => {
        const res = switcher.switchCategory("PERSONAL");
        expect(res.success).toBe(true);
        expect(res.previousCategory).toBe("WORK");
        expect(res.newCategory).toBe("PERSONAL");
        expect(switcher.getActiveCategory()).toBe("PERSONAL");
    });

    it("should cycle through categories in radial order", () => {
        switcher.switchCategory("WORK");
        const cat1 = switcher.cycleNextCategory();
        expect(cat1).toBe("PERSONAL");
        const cat2 = switcher.cycleNextCategory();
        expect(cat2).toBe("CREATIVE");
        const cat3 = switcher.cycleNextCategory();
        expect(cat3).toBe("HEALTH");
        const cat4 = switcher.cycleNextCategory();
        expect(cat4).toBe("WORK");
    });

    it("should pass LEAF automated category assertion suite", () => {
        const pass = switcher.runLeafCategoryAssertions();
        expect(pass).toBe(true);
    });
});
