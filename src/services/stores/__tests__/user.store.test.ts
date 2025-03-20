import { describe, it, expect } from "vitest";
import { useUserStore } from "../user.store";
import { GitHubSearchResponse } from "../../api/api-types/user.type";

describe("useUserStore", () => {
  it("should initialize with default values", () => {
    const { data, searchValue } = useUserStore.getState();
    expect(data).toBeNull();
    expect(searchValue).toBe("");
  });

  it("should update data when setUserData is called", () => {
    const mockData: GitHubSearchResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          login: "testuser",
          id: 1,
          node_id: "MDQ6VXNlcjE=",
          avatar_url: "https://example.com/avatar.png",
          gravatar_id: "",
          url: "https://api.github.com/users/testuser",
          html_url: "https://github.com/testuser",
          followers_url: "https://api.github.com/users/testuser/followers",
          following_url:
            "https://api.github.com/users/testuser/following{/other_user}",
          gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/testuser/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/testuser/subscriptions",
          organizations_url: "https://api.github.com/users/testuser/orgs",
          repos_url: "https://api.github.com/users/testuser/repos",
          events_url: "https://api.github.com/users/testuser/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/testuser/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
          user_view_type: "test",
        },
      ],
    };

    useUserStore.getState().setUserData(mockData);
    expect(useUserStore.getState().data).toEqual(mockData);
  });

  it("should update searchValue when setSearchValue is called", () => {
    const newSearchValue = "test search";
    useUserStore.getState().setSearchValue(newSearchValue);
    expect(useUserStore.getState().searchValue).toBe(newSearchValue);
  });
});
