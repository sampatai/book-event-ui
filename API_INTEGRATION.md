# Dynamic Navigation API Integration

Your navigation menu is now dynamic and fetches from an API. Here's how to implement the backend:

## API Endpoint

**URL:** `http://localhost:3000/api/menu`  
**Method:** `GET`  
**Headers:** `Content-Type: application/json`

## API Response Format

Return a JSON response with the following structure:

```json
{
  "success": true,
  "data": {
    "navMain": [
      {
        "title": "Dashboard",
        "url": "/",
        "icon": "Home",
        "isActive": true,
        "items": [
          {
            "title": "Overview",
            "url": "/"
          },
          {
            "title": "Analytics",
            "url": "/analytics"
          }
        ]
      },
      {
        "title": "Users",
        "url": "/users",
        "icon": "Users",
        "items": [
          {
            "title": "List",
            "url": "/users"
          },
          {
            "title": "Add User",
            "url": "/users/new"
          }
        ]
      }
    ],
    "teams": [
      {
        "name": "Team A",
        "plan": "Enterprise"
      }
    ],
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "/avatars/john.jpg"
    }
  }
}
```

## Available Icons

The following Lucide React icons are supported. Use the exact names:

- `Home`
- `SquareTerminal`
- `Bot`
- `BookOpen`
- `Settings2`
- `Frame`
- `PieChart`
- `Map`
- `AudioWaveform`
- `Command`
- `GalleryVerticalEnd`
- `FileText`
- `Users`
- `Zap`
- `Shield`
- `HelpCircle`
- `LogOut`

## Configuration

Set the API URL via environment variable in your `.env` file:

```env
VITE_API_URL=https://api.example.com/api
```

If not set, defaults to `http://localhost:3000/api`

## How It Works

1. When the app loads, `useNavigation()` hook fetches menu data from your API
2. If the API fails, it gracefully falls back to a default menu
3. Menu data is cached in `sessionStorage` for better performance
4. Loading state shows skeleton placeholders while fetching

## Example Node.js/Express Backend

```javascript
app.get("/api/menu", (req, res) => {
  const menu = {
    success: true,
    data: {
      navMain: [
        {
          title: "Dashboard",
          url: "/",
          icon: "Home",
          isActive: true,
          items: [
            { title: "Overview", url: "/" },
            { title: "Reports", url: "/reports" },
          ],
        },
        {
          title: "Settings",
          url: "/settings",
          icon: "Settings2",
          items: [
            { title: "General", url: "/settings" },
            { title: "Team", url: "/settings/team" },
          ],
        },
      ],
    },
  };
  res.json(menu);
});
```

## Example Python/Flask Backend

```python
@app.route('/api/menu', methods=['GET'])
def get_menu():
    menu = {
        "success": True,
        "data": {
            "navMain": [
                {
                    "title": "Dashboard",
                    "url": "/",
                    "icon": "Home",
                    "isActive": True,
                    "items": [
                        {"title": "Overview", "url": "/"},
                        {"title": "Reports", "url": "/reports"}
                    ]
                },
                {
                    "title": "Settings",
                    "url": "/settings",
                    "icon": "Settings2",
                    "items": [
                        {"title": "General", "url": "/settings"},
                        {"title": "Team", "url": "/settings/team"}
                    ]
                }
            ]
        }
    }
    return jsonify(menu)
```

## Frontend Usage

The menu automatically updates whenever the component mounts. To manually refresh:

```typescript
import { useNavigation } from '@/hooks/useNavigation';

function MyComponent() {
  const { navItems, loading, error } = useNavigation();

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Menu failed to load, using defaults</div>;
  }

  return <div>{navItems.length} menu items loaded</div>;
}
```

## Error Handling

If the API fails:

- A console warning is logged
- The default menu is used automatically
- The app continues to work without interruption

## File Structure

```
src/
  hooks/
    useNavigation.ts          # Hook to fetch menu
  lib/
    api.ts                    # API calls and types
    icons.ts                  # Icon name mapping
  components/
    App-sidebar.tsx           # Uses useNavigation hook
    Nav-main.tsx              # Renders menu items
```
