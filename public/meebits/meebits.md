# Meebits

This folder contains the palette, model and attribute data for all 20,000 Meebits, an NFT project launched in 2021 by Larva Labs LLC.

## File Format

Each Meebit is represented by a JSON file that lists all the Meebit's attributes, such as hair, shirt, shoes, etc. Also included are two special fields represented as 0x-style hex strings. They encode big-endian, unsigned bytes and are explained below.

### Palette

Each palette entry is encoded as a sequence of four bytes. The first is the index into the palette table. The next three bytes are red, green, and blue values.

### Voxels

Each entry is encoded as a sequence of four bytes. The first three bytes encode the x, y, and z co-ordinates of the voxel. The fourth byte specifies the palette entry index, from which can be derived the voxel's color.
