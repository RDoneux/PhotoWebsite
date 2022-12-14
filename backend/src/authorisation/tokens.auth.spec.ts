import { issueToken, tokenAuth } from "./tokens.auth";

describe("tokens", () => {
  beforeEach(() => {
    process.env = {
      TOKEN_USERNAME:
        "$2b$10$DcrBdo8/4c/5QvAIcj/JcuOXnxSDbmoWyK4INyBmWtbtCglLwPNNS",
      TOKEN_PASSWORD:
        "$2b$10$/YDcecW1ma1t0W.mIhPIlubzcKHwXeU3efzksEJd.QPkOitn0dG8W",
      SIGNATURE: "663d6874-5621-4726-83a9-f94e65d7dfce",
    };
  });
  describe("issueToken", () => {
    it("should create token if username, password and details are provided", async () => {
      const req: any = {
        body: {
          title: "test-title",
          privilages: ["test-privilage"],
          expiresIn: 1,
        },
        headers: {
          authorization: "undefined dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await issueToken(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalled();
    });
  });
  it("should create token if username, password and details are provided and no expiresIn variable set", async () => {
    const req: any = {
      body: {
        title: "test-title",
        privilages: ["test-privilage"],
      },
      headers: {
        authorization: "undefined dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 201 if no auth is sent", async () => {
    const req: any = {
      body: {
        title: "test-title",
        privilages: ["test-privilage"],
        expiresIn: 1,
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
  });
  it("should return 500 if keyTitle and Privilages variables aren't sent", async () => {
    const req: any = {
      body: {},
      headers: {
        authorization: "undefined dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      data: "Please provide the following attributes: 'keyTitle', 'privilages'",
    });
  });
  it("should return 500 if .env file doesn't include a valid username or password", async () => {
    process.env = {};
    const req: any = {
      body: {},
      headers: {
        authorization: "undefined dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      data: "Essential environmental variables have not been set. Please see env.example to set up an valid .env file",
    });
  });
  it("should return 500 if body isn't included in request", async () => {
    const req: any = {
      body: undefined,
      headers: {
        authorization: "undefined dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      data: "Please provide the following attributes: 'keyTitle', 'privilages'",
    });
  });
  it("should return 401 if auth is invalid", async () => {
    const req: any = {
      body: {
        title: "test-title",
        privilages: ["test-privilage"],
        expiresIn: 1,
      },
      headers: {
        authorization: "undefined incorrect-auth",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await issueToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      data: "Please provide a valid username and password",
    });
  });
  describe("tokenAuth", () => {
    it("should authorise correct token with Bearer auth type", () => {
      process.env = {
        SIGNATURE: "53d22aab-2a74-4607-803f-3583362de564",
      };
      const req: any = {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6InRlc3QiLCJwcml2aWxhZ2VzIjpbIiJdLCJpYXQiOjE2NzAwMDUzODd9.Zi2xpAI6RRTHPR2gyxm_PHEqSnlZVthnSnvBb7UQyTc",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();

      tokenAuth(req, res, next);

      expect(req["access"]).toBeTruthy();
    });
    it("should not authorise incorrect token with Bearer auth type", () => {
      process.env = {
        SIGNATURE: "53d22aab-2a74-4607-803f-3583362de564",
      };
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();
      tokenAuth(req, res, next);

      expect(req["access"]).toBeUndefined();
    });
    it("should return 500 if no .env signature has been set", () => {
      process.env = {};
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();
      tokenAuth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        data: "Cannot verify token as no environmental token signature has been provided. Please see .env.example for information on how to setup a valid .env file",
      });
    });
  });
});
