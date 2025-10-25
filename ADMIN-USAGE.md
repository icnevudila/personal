# Admin Mode Usage Guide

## Enabling Admin Mode

To enable admin mode, use the browser console:

1. Press **F12** in your browser
2. Go to the **Console** tab
3. Paste the following code and press Enter:

```javascript
localStorage.setItem('adminMode', 'true');
window.location.reload();
```

## Disabling Admin Mode

While in admin mode:
- Click the **"Admin Mode: On"** button in the Blog or Projects section
- Or type this in the console:

```javascript
localStorage.setItem('adminMode', 'false');
window.location.reload();
```

## What You Can Do in Admin Mode

### Blog Section
- ✅ Add new posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Upload images to posts

### Projects Section
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Upload images to projects

### About Section
- ✅ Upload profile image

### Hero Section
- ✅ Upload profile image (from Admin Panel)

## Important Notes

- ⚠️ Admin mode is **only visible to the person who enabled it**
- ⚠️ Admin buttons are not visible to regular visitors
- ⚠️ Data is browser-specific since localStorage is used
- ⚠️ Admin mode will reset if you clear your browser cache

