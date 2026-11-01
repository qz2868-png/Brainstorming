#!/usr/bin/env python3
import http.server
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class FastHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching for images, CSS, and JS so phone doesn't re-download every time
        if self.path.endswith(('.jpg', '.png', '.jpeg', '.svg', '.webp')):
            self.send_header('Cache-Control', 'public, max-age=604800') # 7 days
        elif self.path.endswith(('.css', '.js')):
            self.send_header('Cache-Control', 'public, max-age=3600')   # 1 hour
        else:
            self.send_header('Cache-Control', 'no-cache')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress noisy logging for faster throughput
        pass

if __name__ == '__main__':
    # Use ThreadingHTTPServer for concurrent parallel asset delivery
    server = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), FastHTTPRequestHandler)
    print(f"High-performance threaded server running on port {PORT}...")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

