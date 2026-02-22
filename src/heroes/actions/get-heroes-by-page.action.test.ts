import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";

import AxiosMockAdapter from "axios-mock-adapter"
import { heroAPI } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL


describe("getHeroesByPageAction", () => {

    const heroesApiMock = new AxiosMockAdapter(heroAPI)

    beforeEach(() => {
        heroesApiMock.reset()
    })

    test("should retunr default heroes", async () => {

        heroesApiMock.onGet("/").reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: "1.jpg"
                },
                {
                    image: "2.jpg"
                }
            ]
        })

        const response = await getHeroesByPageAction(1)
        expect(response).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                { image: `${BASE_URL}/images/1.jpg` },
                { image: `${BASE_URL}/images/2.jpg` }
            ]
        })

    })
})