$files = @(
    "src\components\Header.tsx",
    "src\components\pages\AboutPage.tsx",
    "src\components\experience\WolganVectorBridge.tsx",
    "src\components\experience\AboutSection.tsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $content = $content.Replace('href="/Wolgan_Brochure.pdf"', 'href="/api/download?file=Wolgan_Brochure.pdf"')
    $content = $content.Replace('href="/NCR_Brochure.pdf"', 'href="/api/download?file=NCR_Brochure.pdf"')
    $content = $content.Replace('href="/Rydlyme_Brochure.pdf"', 'href="/api/download?file=Rydlyme_Brochure.pdf"')
    $content = $content.Replace('file: "/Wolgan_Brochure.pdf"', 'file: "/api/download?file=Wolgan_Brochure.pdf"')
    $content = $content.Replace('file: "/NCR_Brochure.pdf"', 'file: "/api/download?file=NCR_Brochure.pdf"')
    $content = $content.Replace('file: "/Rydlyme_Brochure.pdf"', 'file: "/api/download?file=Rydlyme_Brochure.pdf"')
    Set-Content $file $content -NoNewline
    Write-Host "Updated: $file"
}
Write-Host "All done."
