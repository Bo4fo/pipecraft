import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../core/Button";
import { StatusBadge } from "../core/StatusBadge";
import { Badge } from "../core/Badge";

describe("Button", () => {
  it("renders children and forwards a ref", () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole("button", { name: "Deploy" })).toBeInTheDocument();
  });

  it("disables the button while loading", () => {
    render(<Button loading>Deploy</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("StatusBadge", () => {
  it("resolves the label and role from the shared status config", () => {
    render(<StatusBadge status="running" />);
    expect(screen.getByRole("status")).toHaveTextContent("Running");
  });

  it("supports a label override", () => {
    render(<StatusBadge status="failed" label="Build failed" />);
    expect(screen.getByRole("status")).toHaveTextContent("Build failed");
  });
});

describe("Badge", () => {
  it("applies the variant class", () => {
    render(<Badge variant="danger">Critical</Badge>);
    expect(screen.getByText("Critical")).toHaveClass("text-status-danger");
  });
});
