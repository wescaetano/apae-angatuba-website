# Servidor HTTP simples em PowerShell
$port = 8080
$root = Get-Location

Write-Host "Iniciando servidor HTTP na porta $port..."
Write-Host "Acesse: http://localhost:$port"
Write-Host "Pressione Ctrl+C para parar o servidor"
Write-Host ""

# Função para obter o tipo MIME baseado na extensão do arquivo
function Get-MimeType {
    param([string]$extension)
    $mimeTypes = @{
        '.html' = 'text/html'
        '.css' = 'text/css'
        '.js' = 'application/javascript'
        '.json' = 'application/json'
        '.png' = 'image/png'
        '.jpg' = 'image/jpeg'
        '.jpeg' = 'image/jpeg'
        '.gif' = 'image/gif'
        '.ico' = 'image/x-icon'
        '.svg' = 'image/svg+xml'
        '.txt' = 'text/plain'
    }
    return $mimeTypes[$extension] ?? 'application/octet-stream'
}

try {
    $listener = [System.Net.HttpListener]::new()
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $url = $request.Url.LocalPath
        if ($url -eq '/') {
            $url = '/index.html'
        }
        
        $filePath = Join-Path $root $url.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath)
            $mimeType = Get-MimeType $extension
            
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mimeType
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            
            Write-Host "$(Get-Date -Format 'HH:mm:ss') - GET $url - 200 OK"
        } else {
            $response.StatusCode = 404
            $notFoundContent = [System.Text.Encoding]::UTF8.GetBytes("404 - Arquivo não encontrado")
            $response.OutputStream.Write($notFoundContent, 0, $notFoundContent.Length)
            
            Write-Host "$(Get-Date -Format 'HH:mm:ss') - GET $url - 404 Not Found"
        }
        
        $response.Close()
    }
} catch {
    Write-Host "Erro: $_"
} finally {
    if ($listener) {
        $listener.Stop()
        $listener.Close()
    }
} 