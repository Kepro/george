/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { CurrenciesPage } from "./CurrenciesPage";
import { useQuery } from "../hooks/useQuery";
import { useHashRouter } from "../hooks/useHashRouter";
import data from "../mocks/fx.json";

jest.mock("../hooks/useQuery");
jest.mock("../hooks/useHashRouter");

(useHashRouter as jest.Mock).mockReturnValue({
  hash: "",
  setHash: jest.fn(),
});

describe("CurrenciesPage", () => {
  it("renders Loading when status is pending", () => {
    (useQuery as jest.Mock).mockReturnValue({
      status: "pending",
      data: null,
    });

    render(<CurrenciesPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders Error when status is failed", () => {
    (useQuery as jest.Mock).mockReturnValue({
      status: "failed",
      data: null,
    });

    render(<CurrenciesPage />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders CurrencyList when data is available", async () => {
    const lastUpdated = "2023-02-24T18:00:00Z";
    (useQuery as jest.Mock).mockReturnValue({
      status: "success",
      data: {
        fx: [data.fx[0], data.fx[1], data.fx[2]],
        lastUpdated,
      },
    });

    render(<CurrenciesPage />);

    const date = new Date(lastUpdated).toLocaleString();

    expect(screen.getByRole("list")).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBe(3);
    expect(screen.getByText(`Last updated: ${date}`)).toBeInTheDocument();
  });
});
