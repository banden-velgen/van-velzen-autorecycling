const fs = require('fs');
const path = require('path');

// List of files that were incorrectly updated
const brokenFiles = [
  'src/app/algemene-voorwaarden/page.tsx',
  'src/app/auto-inleveren-voor-sloop/page.tsx',
  'src/app/auto-met-schade-verkopen/page.tsx',
  'src/app/auto-naar-de-sloop-brengen/page.tsx',
  'src/app/auto-verkopen-na-een-ongeluk/page.tsx',
  'src/app/auto-verkopen-na-een-ongeval/page.tsx',
  'src/app/beschadigde-auto-verkopen/page.tsx',
  'src/app/cookiebeleid/page.tsx',
  'src/app/de/dienstleistungen/page.tsx',
  'src/app/de/prozess/page.tsx',
  'src/app/en/algemene-voorwaarden/page.tsx',
  'src/app/en/cookiebeleid/page.tsx',
  'src/app/en/privacybeleid/page.tsx',
  'src/app/en/process/page.tsx',
  'src/app/es/contacto/page.tsx',
  'src/app/es/proceso/page.tsx',
  'src/app/es/servicios/page.tsx',
  'src/app/es/sobre-nosotros/page.tsx',
  'src/app/fr/a-propos/page.tsx',
  'src/app/fr/contact/page.tsx',
  'src/app/fr/processus/page.tsx',
  'src/app/fr/services/page.tsx',
  'src/app/fr/vendre-voiture-rebut/page.tsx',
  'src/app/hoeveel-geld-krijg-ik-voor-mijn-schadeauto/page.tsx',
  'src/app/hoeveel-geld-krijg-ik-voor-mijn-sloopauto/page.tsx',
  'src/app/hoeveel-is-mijn-schadeauto-waard/page.tsx',
  'src/app/hoeveel-is-mijn-sloopauto-waard/page.tsx',
  'src/app/it/chi-siamo/page.tsx',
  'src/app/it/contatto/page.tsx',
  'src/app/it/processo/page.tsx',
  'src/app/it/servizi/page.tsx',
  'src/app/privacybeleid/page.tsx',
  'src/app/schadeauto-verkopen/page.tsx',
  'src/app/schadeautos-gevraagd/page.tsx',
  'src/app/sloopauto-delft/page.tsx',
  'src/app/sloopauto-gratis-inleveren/page.tsx',
  'src/app/sloopauto-gratis-laten-ophalen/page.tsx',
  'src/app/sloopauto-inleveren/page.tsx',
  'src/app/sloopauto-laten-ophalen/page.tsx',
  'src/app/sloopauto-verkopen/page.tsx',
  'src/app/sloopauto-verkopen-aalsmeer/page.tsx',
  'src/app/sloopauto-verkopen-abcoude/page.tsx',
  'src/app/sloopauto-verkopen-alphen-aan-den-rijn/page.tsx',
  'src/app/sloopauto-verkopen-amerongen/page.tsx',
  'src/app/sloopauto-verkopen-amersfoort/page.tsx',
  'src/app/sloopauto-verkopen-amstelveen/page.tsx',
  'src/app/sloopauto-verkopen-amsterdam/page.tsx',
  'src/app/sloopauto-verkopen-apeldoorn/page.tsx',
  'src/app/sloopauto-verkopen-arnhem/page.tsx',
  'src/app/sloopauto-verkopen-baarn/page.tsx',
  'src/app/sloopauto-verkopen-barneveld/page.tsx',
  'src/app/sloopauto-verkopen-beekbergen/page.tsx',
  'src/app/sloopauto-verkopen-beesd/page.tsx',
  'src/app/sloopauto-verkopen-bemmel/page.tsx',
  'src/app/sloopauto-verkopen-bennekom/page.tsx',
  'src/app/sloopauto-verkopen-benthuizen/page.tsx',
  'src/app/sloopauto-verkopen-bergschenhoek/page.tsx',
  'src/app/sloopauto-verkopen-berkel-en-rodenrijs/page.tsx',
  'src/app/sloopauto-verkopen-beuningen/page.tsx',
  'src/app/sloopauto-verkopen-bilthoven/page.tsx',
  'src/app/sloopauto-verkopen-bleiswijk/page.tsx',
  'src/app/sloopauto-verkopen-bloemendaal/page.tsx',
  'src/app/sloopauto-verkopen-bodegraven/page.tsx',
  'src/app/sloopauto-verkopen-boskoop/page.tsx',
  'src/app/sloopauto-verkopen-breukelen/page.tsx',
  'src/app/sloopauto-verkopen-bunnik/page.tsx',
  'src/app/sloopauto-verkopen-bussum/page.tsx',
  'src/app/sloopauto-verkopen-capelle-aan-den-ijssel/page.tsx',
  'src/app/sloopauto-verkopen-culemborg/page.tsx',
  'src/app/sloopauto-verkopen-delft/page.tsx',
  'src/app/sloopauto-verkopen-delier/page.tsx',
  'src/app/sloopauto-verkopen-denhaag/page.tsx',
  'src/app/sloopauto-verkopen-denhoorn/page.tsx',
  'src/app/sloopauto-verkopen-diemen/page.tsx',
  'src/app/sloopauto-verkopen-doorn/page.tsx',
  'src/app/sloopauto-verkopen-druten/page.tsx',
  'src/app/sloopauto-verkopen-ede/page.tsx',
  'src/app/sloopauto-verkopen-eemnes/page.tsx',
  'src/app/sloopauto-verkopen-elst/page.tsx',
  'src/app/sloopauto-verkopen-geldermalsen/page.tsx',
  'src/app/sloopauto-verkopen-gouda/page.tsx',
  'src/app/sloopauto-verkopen-haarlem/page.tsx',
  'src/app/sloopauto-verkopen-harmelen/page.tsx',
  'src/app/sloopauto-verkopen-hazerswoude-dorp/page.tsx',
  'src/app/sloopauto-verkopen-heemstede/page.tsx',
  'src/app/sloopauto-verkopen-hillegom/page.tsx',
  'src/app/sloopauto-verkopen-hilversum/page.tsx',
  'src/app/sloopauto-verkopen-hoekvanholland/page.tsx',
  'src/app/sloopauto-verkopen-hoenderloo/page.tsx',
  'src/app/sloopauto-verkopen-hoevelaken/page.tsx',
  'src/app/sloopauto-verkopen-honselersdijk/page.tsx',
  'src/app/sloopauto-verkopen-hoofddorp/page.tsx',
  'src/app/sloopauto-verkopen-houten/page.tsx',
  'src/app/sloopauto-verkopen-huizen/page.tsx',
  'src/app/sloopauto-verkopen-ijmuiden/page.tsx',
  'src/app/sloopauto-verkopen-katwijk-aan-zee/page.tsx',
  'src/app/sloopauto-verkopen-kesteren/page.tsx',
  'src/app/sloopauto-verkopen-koudekerk-aan-den-rijn/page.tsx',
  'src/app/sloopauto-verkopen-kwintsheul/page.tsx',
  'src/app/sloopauto-verkopen-laren/page.tsx',
  'src/app/sloopauto-verkopen-leerdam/page.tsx',
  'src/app/sloopauto-verkopen-leersum/page.tsx',
  'src/app/sloopauto-verkopen-leiden/page.tsx',
  'src/app/sloopauto-verkopen-leidschendam/page.tsx',
  'src/app/sloopauto-verkopen-leusden/page.tsx',
  'src/app/sloopauto-verkopen-lisse/page.tsx',
  'src/app/sloopauto-verkopen-lopik/page.tsx',
  'src/app/sloopauto-verkopen-lunteren/page.tsx',
  'src/app/sloopauto-verkopen-maarssen/page.tsx',
  'src/app/sloopauto-verkopen-maasdijk/page.tsx',
  'src/app/sloopauto-verkopen-maasland/page.tsx',
  'src/app/sloopauto-verkopen-maassluis/page.tsx',
  'src/app/sloopauto-verkopen-meerkerk/page.tsx',
  'src/app/sloopauto-verkopen-mijdrecht/page.tsx',
  'src/app/sloopauto-verkopen-moerkapelle/page.tsx',
  'src/app/sloopauto-verkopen-monster/page.tsx',
  'src/app/sloopauto-verkopen-montfoort/page.tsx',
  'src/app/sloopauto-verkopen-muiden/page.tsx',
  'src/app/sloopauto-verkopen-naaldwijk/page.tsx',
  'src/app/sloopauto-verkopen-naarden/page.tsx',
  'src/app/sloopauto-verkopen-nieuw-vennep/page.tsx',
  'src/app/sloopauto-verkopen-nieuwegein/page.tsx',
  'src/app/sloopauto-verkopen-nieuwerkerk-aan-den-ijssel/page.tsx',
  'src/app/sloopauto-verkopen-nieuwkoop/page.tsx',
  'src/app/sloopauto-verkopen-nijkerk/page.tsx',
  'src/app/sloopauto-verkopen-nijmegen/page.tsx',
  'src/app/sloopauto-verkopen-noordwijk/page.tsx',
  'src/app/sloopauto-verkopen-noordwijkerhout/page.tsx',
  'src/app/sloopauto-verkopen-nootdorp/page.tsx',
  'src/app/sloopauto-verkopen-oegstgeest/page.tsx',
  'src/app/sloopauto-verkopen-otterlo/page.tsx',
  'src/app/sloopauto-verkopen-overschie/page.tsx',
  'src/app/sloopauto-verkopen-pijnacker/page.tsx',
  'src/app/sloopauto-verkopen-poeldijk/page.tsx',
  'src/app/sloopauto-verkopen-reeuwijk/page.tsx',
  'src/app/sloopauto-verkopen-renkum/page.tsx',
  'src/app/sloopauto-verkopen-rhenen/page.tsx',
  'src/app/sloopauto-verkopen-rijnmond/page.tsx',
  'src/app/sloopauto-verkopen-rijnsburg/page.tsx',
  'src/app/sloopauto-verkopen-rijswijk/page.tsx',
  'src/app/sloopauto-verkopen-roelofarendsveen/page.tsx',
  'src/app/sloopauto-verkopen-rotterdam/page.tsx',
  'src/app/sloopauto-verkopen-s-gravenzande/page.tsx',
  'src/app/sloopauto-verkopen-sassenheim/page.tsx',
  'src/app/sloopauto-verkopen-scheveningen/page.tsx',
  'src/app/sloopauto-verkopen-schiedam/page.tsx',
  'src/app/sloopauto-verkopen-schiphol/page.tsx',
  'src/app/sloopauto-verkopen-schipluiden/page.tsx',
  'src/app/sloopauto-verkopen-schoonhoven/page.tsx',
  'src/app/sloopauto-verkopen-soest/page.tsx',
  'src/app/sloopauto-verkopen-tiel/page.tsx',
  'src/app/sloopauto-verkopen-uithoorn/page.tsx',
  'src/app/sloopauto-verkopen-utrecht/page.tsx',
  'src/app/sloopauto-verkopen-valkenburg/page.tsx',
  'src/app/sloopauto-verkopen-veenendaal/page.tsx',
  'src/app/sloopauto-verkopen-vianen/page.tsx',
  'src/app/sloopauto-verkopen-vlaardingen/page.tsx',
  'src/app/sloopauto-verkopen-voorburg/page.tsx',
  'src/app/sloopauto-verkopen-voorhout/page.tsx',
  'src/app/sloopauto-verkopen-voorschoten/page.tsx',
  'src/app/sloopauto-verkopen-waddinxveen/page.tsx',
  'src/app/sloopauto-verkopen-wageningen/page.tsx',
  'src/app/sloopauto-verkopen-warmond/page.tsx',
  'src/app/sloopauto-verkopen-wassenaar/page.tsx',
  'src/app/sloopauto-verkopen-wateringen/page.tsx',
  'src/app/sloopauto-verkopen-weesp/page.tsx',
  'src/app/sloopauto-verkopen-westland/page.tsx',
  'src/app/sloopauto-verkopen-wijk-bij-duurstede/page.tsx',
  'src/app/sloopauto-verkopen-woerden/page.tsx',
  'src/app/sloopauto-verkopen-woudenberg/page.tsx',
  'src/app/sloopauto-verkopen-zaandam/page.tsx',
  'src/app/sloopauto-verkopen-zandvoort/page.tsx',
  'src/app/sloopauto-verkopen-zeist/page.tsx',
  'src/app/sloopauto-verkopen-zevenhuizen/page.tsx',
  'src/app/sloopauto-verkopen-zoetermeer/page.tsx',
  'src/app/sloopauto-verkopen-zoeterwoude/page.tsx',
  'src/app/sloopauto-verkopen-zuidholland/page.tsx',
  'src/app/sloopauto-verkopen-zwammerdam/page.tsx',
  'src/app/sloopautos-gevraagd/page.tsx',
  'src/app/total-loss-auto-verkopen/page.tsx',
];

function fixPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the incorrectly placed closing tags from metadata section
    content = content.replace(/\s*<\/main>\s*<Footer \/>\s*<\/div>\s*<WhatsAppButton \/>\s*<\/ThemeProvider>\s*\)\s*\}\s*export default function/g, '}\n\nexport default function');
    
    // Remove the incorrectly placed opening tags
    content = content.replace(/return \(\s*<ThemeProvider attribute="class" defaultTheme="light" enableSystem>\s*<div className="flex min-h-screen flex-col">\s*<Header \/>\s*<main className="flex-1">/g, 'return (');
    
    // Add the correct structure
    content = content.replace(/export default function\s+\w+\s*\(\)\s*\{/g, (match) => {
      return match + '\n  return (\n    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>\n      <div className="flex min-h-screen flex-col">\n        <Header />\n        <main className="flex-1">';
    });
    
    // Add the correct closing structure
    content = content.replace(/\s*\}\s*$/g, '\n        </main>\n        <Footer />\n      </div>\n      <WhatsAppButton />\n    </ThemeProvider>\n  )\n}');
    
    // Write the fixed content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔧 Fixing broken pages...');

let fixedCount = 0;
for (const file of brokenFiles) {
  if (fs.existsSync(file)) {
    fixPage(file);
    fixedCount++;
  }
}

console.log(`\n🎉 Fixed ${fixedCount} pages!`); 