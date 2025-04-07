from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import json
import os

PORT = 8000

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/list-images':
            images = [f for f in os.listdir('cards') if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(images).encode())
        else:
            super().do_GET()

with TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando na porta {PORT}")
    httpd.serve_forever()