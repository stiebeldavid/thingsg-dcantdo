

# Fix Grainy Book Thumbnails

## Problem

The thumbnail container is set to `w-28 h-40` (112x160 CSS pixels). On Retina/high-DPI screens (2x-3x), the browser needs 224-336px wide images to render sharply. The small container combined with `object-cover` cropping causes the images to appear grainy and blurry.

## Solution

Increase the thumbnail display size so the existing higher-resolution source images have more room to render clearly, and the visual quality improves across all screen densities.

## Technical Details

### Changes to `src/pages/Book.tsx`

- Increase the thumbnail container from `w-28 h-40` to `w-36 h-52` (144x208 CSS pixels) -- this gives the browser more pixels to work with and better matches the source image resolution
- Optionally adjust the grid gap/columns if needed to accommodate the slightly larger thumbnails

This is a one-line CSS class change that will make the covers noticeably sharper, especially on mobile Retina screens.

