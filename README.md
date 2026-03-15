# Image Processing API

A Node.js + Express API that resizes images on demand and caches the results for faster repeated access. Built with TypeScript, Sharp, and tested with Jasmine + SuperTest.

---

## How It Works

1. You send a request with a filename, width, and height
2. The API checks if that exact size already exists in the `thumb/` folder
3. **If it does** — it serves the cached version immediately (no reprocessing)
4. **If it doesn't** — Sharp resizes the original image, saves it to `thumb/`, then serves it

This means the first request for a given size takes slightly longer, but every repeat request is instant.

---

## Project Structure

```
├── src/
│   ├── index.ts                  # Express server entry point
│   ├── routes/
│   │   └── api/
│   │       └── images.ts         # Route handler + input validation
│   ├── utilities/
│   │   └── imageProcessor.ts     # Sharp resizing logic + caching
│   └── test/
│       ├── indexSpec.ts          # API endpoint tests (SuperTest)
│       ├── imageProcessorSpec.ts # Unit tests for imageProcessor
│       └── helpers/
│           └── reporter.ts       # Jasmine reporter config
├── images/                       # Original full-size images (source)
├── thumb/                        # Resized/cached images (output)
├── dist/                         # Compiled JavaScript (auto-generated)
└── spec/
    └── support/
        └── jasmine.json          # Jasmine configuration
```

---

## API Endpoint

```
GET /api/images?filename={name}&width={w}&height={h}
```

| Parameter  | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| `filename` | string | yes      | Image name without extension          |
| `width`    | number | yes      | Target width in pixels (must be > 0)  |
| `height`   | number | yes      | Target height in pixels (must be > 0) |

### Example Requests

```
http://localhost:3000/api/images?filename=fjord&width=300&height=200
http://localhost:3000/api/images?filename=encenadaport&width=500&height=300
http://localhost:3000/api/images?filename=palmtunnel&width=400&height=400
http://localhost:3000/api/images?filename=icelandwaterfall&width=200&height=200
http://localhost:3000/api/images?filename=santamonica&width=600&height=400
```

### Available Images

| Filename           |
| ------------------ |
| `fjord`            |
| `encenadaport`     |
| `palmtunnel`       |
| `icelandwaterfall` |
| `santamonica`      |

---

## Caching

Processed images are saved to the `thumb/` folder using the naming convention:

```
thumb/{filename}_{width}x{height}.jpg

# Example
thumb/fjord_300x200.jpg
thumb/encenadaport_500x300.jpg
```

If you request the same image and size again, the API skips Sharp entirely and serves the file directly from `thumb/`. You can verify this by checking that folder after making requests — a new file appears for each unique size you request.

---

## Error Handling

| Scenario                                 | Status | Response                                                       |
| ---------------------------------------- | ------ | -------------------------------------------------------------- |
| Missing `filename`                       | `400`  | `{ "error": "Missing required parameter: filename" }`          |
| Missing `width` or `height`              | `400`  | `{ "error": "Missing required parameters: width and height" }` |
| Invalid width/height (non-number or ≤ 0) | `400`  | `{ "error": "Width and height must be positive numbers" }`     |
| Image file not found                     | `404`  | `{ "error": "Image \"filename\" not found" }`                  |
| Unexpected processing failure            | `500`  | `{ "error": "Image processing failed" }`                       |

---

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm start`      | Start the production server        |
| `npm run build`  | Compile TypeScript to JavaScript   |
| `npm test`       | Build + run all Jasmine tests      |
| `npm run lint`   | Run ESLint on all TypeScript files |
| `npm run format` | Run Prettier to format all files   |
| `npm run dev`    | Start dev server with nodemon      |

---

## Getting Started

```bash

# Build the project
npm run build

# Start the server
npm start
```

Then open your browser and visit:

```
http://localhost:3000/api/images?filename=fjord&width=300&height=200
```

---

## Running Tests

```bash
npm test
```

Expected output:

```
imageProcessor utility
  ✓ should resize an image and save it to thumb/
  ✓ should return cached image on second call
  ✓ should throw error for non-existent image

GET /api/images
  ✓ should return 200 and an image for valid params
  ✓ should return 400 when filename is missing
  ✓ should return 400 when width is missing
  ✓ should return 400 for invalid width value
  ✓ should return 404 for non-existent image

Executed 8 of 8 specs SUCCESS
```

---

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sharp](https://sharp.pixelplumbing.com/) — image processing
- [TypeScript](https://www.typescriptlang.org/)
- [Jasmine](https://jasmine.github.io/) — testing framework
- [SuperTest](https://github.com/ladjs/supertest) — HTTP testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting & formatting

---

## Author

ahmadD
