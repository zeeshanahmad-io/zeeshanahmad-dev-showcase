import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OptimizationResult {
    original: string;
    webp: string;
    originalSize: number;
    webpSize: number;
    savings: number;
}

const results: OptimizationResult[] = [];

// Directories to process
const directories = [
    path.join(__dirname, '../src/assets'),
    path.join(__dirname, '../src/assets/icons'),
    path.join(__dirname, '../public/images/blogs/claude-code-openrouter-guide'),
    path.join(__dirname, '../public/images/blogs/password-management-guide')
];

// Create backup directory
const backupDir = path.join(__dirname, '../image-backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeImage(filePath: string): Promise<void> {
    const ext = path.extname(filePath).toLowerCase();

    // Only process jpg, jpeg, and png files
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return;
    }

    const fileName = path.basename(filePath);
    const dir = path.dirname(filePath);
    const nameWithoutExt = path.basename(filePath, ext);
    const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
    const backupPath = path.join(backupDir, fileName);

    try {
        // Get original size
        const originalStats = fs.statSync(filePath);
        const originalSize = originalStats.size;

        // Backup original
        fs.copyFileSync(filePath, backupPath);

        // Convert to WebP
        await sharp(filePath)
            .webp({ quality: 85, effort: 6 })
            .toFile(webpPath);

        // Get WebP size
        const webpStats = fs.statSync(webpPath);
        const webpSize = webpStats.size;

        const savings = ((originalSize - webpSize) / originalSize) * 100;

        results.push({
            original: fileName,
            webp: `${nameWithoutExt}.webp`,
            originalSize,
            webpSize,
            savings
        });

        console.log(`✅ ${fileName}`);
        console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB`);
        console.log(`   Savings: ${savings.toFixed(1)}%\n`);

    } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error);
    }
}

async function processDirectory(dir: string): Promise<void> {
    if (!fs.existsSync(dir)) {
        console.log(`⚠️  Directory not found: ${dir}`);
        return;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            await optimizeImage(filePath);
        }
    }
}

async function main(): Promise<void> {
    console.log('🖼️  Starting image optimization...\n');
    console.log('📁 Backup directory:', backupDir, '\n');

    for (const dir of directories) {
        console.log(`📂 Processing: ${dir}`);
        await processDirectory(dir);
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60) + '\n');

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSavings = ((totalOriginal - totalWebP) / totalOriginal) * 100;

    console.log(`Total images processed: ${results.length}`);
    console.log(`Total original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total WebP size: ${(totalWebP / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total savings: ${(totalSavings).toFixed(1)}% (${((totalOriginal - totalWebP) / 1024 / 1024).toFixed(2)} MB)\n`);

    console.log('✅ Optimization complete!');
    console.log(`📁 Original images backed up to: ${backupDir}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Test the WebP images in your browser');
    console.log('   2. Update image references to use .webp extension');
    console.log('   3. Consider using <picture> element for fallbacks');
}

main().catch(console.error);
