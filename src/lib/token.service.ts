/**
 * Service to manage access and refresh tokens in localStorage.
 */
class TokenService {
  getLocalRefreshToken(): string | null {
    const user = this.getUser();
    return user?.refreshToken || null;
  }

  getLocalAccessToken(): string | null {
    const user = this.getUser();
    return user?.accessToken || null;
  }

  updateLocalAccessToken(token: string) {
    const user = this.getUser();
    if (user) {
      user.accessToken = token;
      this.setUser(user);
    }
  }

  getUser(): { accessToken?: string; refreshToken?: string } | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
      }
    }
    return null;
  }

  setUser(user: { accessToken?: string; refreshToken?: string } | null) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
