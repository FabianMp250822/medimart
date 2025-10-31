# Script to batch update firebase-admin imports to firebase-helpers
$files = @(
    "src\app\servicios\internacion\cuidado-critico\page.tsx",
    "src\app\servicios\internacion\atencion-vih\page.tsx",
    "src\app\servicios\quirurgicos\cirugia\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-de-la-mano\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-dermatologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-gastrointestinal\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-general\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-maxilofacial\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-oftalmologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-plastica-oncologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-pediatrica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-otorrinolaringologia\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-plastica-y-estetica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-vascular-y-angiologica\page.tsx",
    "src\app\servicios\quirurgicos\neurocirugia\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-urologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-ortopedica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-oral\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-oncologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-de-torax\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-ginecologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-endovascular-neurologica\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-de-cabeza-y-cuello\page.tsx",
    "src\app\servicios\quirurgicos\cirugia-de-mama-y-tumores-tejidos-blandos\page.tsx",
    "src\app\trabaja-con-nosotros\[id]\page.tsx"
)

$rootPath = "c:\Users\fabia\OneDrive\Música\medimart-1"

foreach ($file in $files) {
    $fullPath = Join-Path $rootPath $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Replace import statement
        $content = $content -replace "import { adminDb } from '@/lib/firebase-admin';", "import { safeQuery } from '@/lib/firebase-helpers';"
        
        # Replace getSpecialists pattern (common in service pages)
        $pattern1 = @'
async function getSpecialists\(\): Promise<Medico\[\]> \{
    try \{
        if \(!adminDb\) \{
            console\.warn\('adminDb no está inicializado\. getSpecialists devolverá lista vacía\.'\);
            return \[\];
        \}
        const snapshot = await adminDb\.collection\('medicos'\)
'@
        $replacement1 = @'
async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
'@
        $content = $content -replace $pattern1, $replacement1
        
        # Replace the end of try-catch blocks
        $pattern2 = @'
        return snapshot\.docs\.map\(doc => \(\{ id: doc\.id, \.\.\.(\(doc\.data\(\) as Omit<Medico, 'id'>\)) \}\)\);
    \} catch \(error\) \{
        console\.error\("Error fetching specialists.*?", error\);
        return \[\];
    \}
\}
'@
        $replacement2 = @'
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}
'@
        $content = $content -replace $pattern2, $replacement2
        
        # Save the updated content
        Set-Content $fullPath -Value $content -NoNewline
        Write-Host "Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nAll files processed!" -ForegroundColor Cyan
