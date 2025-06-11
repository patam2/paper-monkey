# Adding new types to the frontend:

## 1. Create needed files to /configurations
- newelement/{prefix}Configure.tsx -> will contain the input parameters/settings for the new item modal.
- newelement/{prefix}ElementItem.tsx -> the element in the newsletter view page
- newelement/{prefix}Types.tsx -> needed types for the element

### {prefix}Types.tsx
Types file needs to export the following:
- Entire item schema as a zod object
- Item settings schema
- The two above's types

### {prefix}ElementItem.tsx
How the item will look in the newsletter view.

### {prefix}Configure.tsx
Item configuration in the modal.

## 2. Modify compose & newsletter page.

Compose.tsx needs to be modified to list the card
elementchooser.tsx needs to be modified to list the settings properties.