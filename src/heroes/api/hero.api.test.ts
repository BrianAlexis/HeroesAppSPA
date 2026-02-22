import { describe, expect, test } from "vitest";
import { heroAPI } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_URL

describe("HeroApi", () => {

    test("Should be configure ponting to the testing server", () => {

        expect(heroAPI).toBeDefined()

        expect(heroAPI.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`)
        expect(BASE_URL).toContain("3001")
    })
})