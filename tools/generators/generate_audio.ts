/**
 * 🌌 generate_audio.ts — Procedural 3D Spatial Audio Synthesizer
 * Generates PCM WAV spatial sound effects for Snap Spectacles audio component.
 */

import fs from "node:fs";
import path from "node:path";

function createWavHeader(dataLength: number, sampleRate = 44100, channels = 1, bitsPerSample = 16): Buffer {
    const header = Buffer.alloc(44);

    // RIFF identifier
    header.write("RIFF", 0);
    header.writeUInt32LE(36 + dataLength, 4);
    header.write("WAVE", 8);

    // fmt subchunk
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
    header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * channels * (bitsPerSample / 8), 28); // ByteRate
    header.writeUInt16LE(channels * (bitsPerSample / 8), 32); // BlockAlign
    header.writeUInt16LE(bitsPerSample, 34);

    // data subchunk
    header.write("data", 36);
    header.writeUInt32LE(dataLength, 40);

    return header;
}

function generateSineWaveSound(freq: number, durationSec: number, sampleRate = 44100): Buffer {
    const numSamples = Math.floor(sampleRate * durationSec);
    const dataBuffer = Buffer.alloc(numSamples * 2);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        // Exponential decay envelope
        const envelope = Math.exp(-t * 5.0);
        const sampleValue = Math.sin(2 * Math.PI * freq * t) * envelope;

        // 16-bit PCM scale (-32768 to 32767)
        const intSample = Math.floor(sampleValue * 32767);
        dataBuffer.writeInt16LE(intSample, i * 2);
    }

    const header = createWavHeader(dataBuffer.length, sampleRate);
    return Buffer.concat([header, dataBuffer]);
}

function main() {
    const audioDir = path.resolve(__dirname, "../../assets/audio");
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
    }

    // 1. Orb Pulse Sound (440Hz, 0.4s)
    const orbPulsePath = path.join(audioDir, "orb_pulse.wav");
    fs.writeFileSync(orbPulsePath, generateSineWaveSound(440, 0.4));
    console.log(`[Audio Generator] Generated ${orbPulsePath}`);

    // 2. Tether Snap Sound (880Hz, 0.25s)
    const tetherSnapPath = path.join(audioDir, "tether_snap.wav");
    fs.writeFileSync(tetherSnapPath, generateSineWaveSound(880, 0.25));
    console.log(`[Audio Generator] Generated ${tetherSnapPath}`);

    // 3. Completion Shockwave Sound (523.25Hz / C5, 0.8s)
    const shockwavePath = path.join(audioDir, "completion_shockwave.wav");
    fs.writeFileSync(shockwavePath, generateSineWaveSound(523.25, 0.8));
    console.log(`[Audio Generator] Generated ${shockwavePath}`);
}

main();
