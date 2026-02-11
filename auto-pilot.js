const { addPost } = require('./maintain.js');
const { execSync } = require('child_process');
const path = require('path');

/*
 * ========================================
 * 🤖 OLi AUTO-PILOT BLOGGER
 * ========================================
 * 
 * This script handles the FULL end-to-end automation:
 * 1. Researches trending content (Simulation for now, or via SearXNG)
 * 2. Writes the high-quality article.
 * 3. Updates index.html.
 * 4. Pushes live to GitHub.
 */

async function autoPilot() {
    console.log("🌊 OLi Auto-Pilot: Initializing...");

    // --- 1. RESEARCH PHASE ---
    // (In a real production environment, this would call SearXNG)
    const topic = "Biometric Security in 2026: Beyond the Fingerprint";
    const category = "Security";
    const excerpt = "Passwords are dead. Fingerprints are old. We explore the 2026 shift to cardiac signatures and iris-mapping.";
    
    const content = `
        <p>By February 2026, the traditional password has become a liability. Even biometric data like fingerprints can now be spoofed with 3D-printed molds. The next frontier of security is <b>Continuous Authentication</b>.</p>
        
        <h2>The Cardiac Signature</h2>
        <p>Your heart has a unique rhythm and electrical pattern that is nearly impossible to replicate. New wearable sensors and smartphone back-panels now authenticate users based on their EKG (Electrocardiogram) signals. If the heart rhythm doesn't match the owner, the device stays locked.</p>
        
        <div class="glow-box">
            "Your body is the only password you'll ever need, and it changes in real-time."
        </div>

        <h2>Iris Mapping at Scale</h2>
        <p>Next-generation smartphones now feature iris-scanning cameras that work at a distance of up to 2 meters. This allows for seamless "walk-by" authentication for smart homes and secure offices.</p>

        <h2>Conclusion</h2>
        <p>The era of remembering strings of characters is over. In 2026, your physical existence is your digital key.</p>
    `;

    // --- 2. WRITING PHASE ---
    console.log(`✍️  Writing Article: ${topic}`);
    await addPost(topic, category, excerpt, content);

    // --- 3. DEPLOYMENT PHASE ---
    console.log("📤 Pushing to GitHub...");
    const deployPath = path.join(__dirname, 'deploy.ps1');
    const techBlogDir = __dirname;
    try {
        // Run the PowerShell deploy script (Using Absolute Path and correct WorkDir)
        execSync(`powershell -File \"${deployPath}\"`, { 
            cwd: techBlogDir, 
            stdio: 'inherit' 
        });
        console.log("🎉 SUCCESS: Website is updated and live!");
    } catch (err) {
        console.error("❌ Deployment failed. Check your Git credentials.");
    }
}

autoPilot();
