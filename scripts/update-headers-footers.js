const fs = require('fs');
const path = require('path');

// Pages that should NOT be updated (admin pages, etc.)
const excludePages = [
  'src/app/admin',
  'src/app-backup',
  'src/app/page.tsx', // Main homepage already has headers/footers
  'src/app/en/page.tsx',
  'src/app/de/page.tsx',
  'src/app/fr/page.tsx',
  'src/app/es/page.tsx',
  'src/app/it/page.tsx',
];

// Pages that have already been updated
const alreadyUpdated = [
  'src/app/diensten/page.tsx',
  'src/app/over-ons/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/proces/page.tsx',
  'src/app/en/services/page.tsx',
  'src/app/en/about-us/page.tsx',
  'src/app/de/ueber-uns/page.tsx',
];

function shouldUpdatePage(filePath) {
  // Check if page should be excluded
  for (const exclude of excludePages) {
    if (filePath.includes(exclude)) {
      return false;
    }
  }
  
  // Check if already updated
  for (const updated of alreadyUpdated) {
    if (filePath.includes(updated)) {
      return false;
    }
  }
  
  return true;
}

function updatePage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if page already has ThemeProvider
    if (content.includes('ThemeProvider')) {
      console.log(`Skipping ${filePath} - already has ThemeProvider`);
      return;
    }
    
    // Check if page has imports
    if (!content.includes('import')) {
      console.log(`Skipping ${filePath} - no imports found`);
      return;
    }
    
    // Add imports
    const importStatement = `import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"`;
    
    // Find the last import statement
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    if (importLines.length === 0) {
      console.log(`Skipping ${filePath} - no import statements found`);
      return;
    }
    
    const lastImportIndex = content.lastIndexOf(importLines[importLines.length - 1]);
    const insertIndex = content.indexOf('\n', lastImportIndex) + 1;
    
    // Insert new imports
    content = content.slice(0, insertIndex) + importStatement + '\n' + content.slice(insertIndex);
    
    // Find the export default function
    const exportMatch = content.match(/export default function\s+\w+\s*\(\)\s*\{/);
    if (!exportMatch) {
      console.log(`Skipping ${filePath} - no export default function found`);
      return;
    }
    
    // Replace the function opening
    const functionStart = exportMatch[0];
    const newFunctionStart = functionStart.replace('{', '{\n  return (\n    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>\n      <div className="flex min-h-screen flex-col">\n        <Header />\n        <main className="flex-1">');
    
    content = content.replace(functionStart, newFunctionStart);
    
    // Find the closing of the component
    const closingMatch = content.match(/\s*\}\s*\}\s*$/);
    if (!closingMatch) {
      console.log(`Skipping ${filePath} - no proper closing found`);
      return;
    }
    
    // Replace the closing
    const oldClosing = closingMatch[0];
    const newClosing = `\n        </main>\n        <Footer />\n      </div>\n      <WhatsAppButton />\n    </ThemeProvider>\n  )\n}`;
    
    content = content.replace(oldClosing, newClosing);
    
    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function findPageFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx') {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Main execution
console.log('🔍 Finding all page.tsx files...');
const pageFiles = findPageFiles('src/app');

console.log(`📁 Found ${pageFiles.length} page files`);

let updatedCount = 0;
for (const file of pageFiles) {
  if (shouldUpdatePage(file)) {
    updatePage(file);
    updatedCount++;
  }
}

console.log(`\n🎉 Updated ${updatedCount} pages with headers and footers!`);
console.log('📝 Pages that were already updated or excluded:');
for (const file of pageFiles) {
  if (!shouldUpdatePage(file)) {
    console.log(`  - ${file}`);
  }
} 