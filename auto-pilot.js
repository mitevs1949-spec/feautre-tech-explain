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
    const topic = "The Rise of Personal Quantum Workstations";
    const category = "Quantum";
    const excerpt = "Desktop quantum computing is no longer a dream. In 2026, the first 'Spin-Q' home units are being delivered.";
    
    const content = `
        <p>For decades, quantum computers were massive machines kept in liquid-helium fridges. But in early 2026, we are seeing the arrival of the first <b>Desktop Quantum Workstations</b>.</p>
        
        <h2>Room Temperature Qubits</h2>
        <p>Using diamond-vacancy centers and room-temperature trapped ions, companies like Spin-Q have released units that fit on a standard desk. While they only feature 8 to 16 qubits, they are enough to revolutionize local cryptography and AI training.</p>
        
        <div class="glow-box">
            "The era of the personal quantum leap has begun."
        </div>

        <h2>Why Developers Want One</h2>
        <p>A personal quantum unit allows for the simulation of complex molecules and the execution of Shor's algorithm on small scales, providing a massive advantage for security researchers and bio-engineers.</p>

        <h2>Conclusion</h2>
        <p>We are currently where the Altair 8800 was in 1975. The personal quantum revolution is just starting.</p>
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
