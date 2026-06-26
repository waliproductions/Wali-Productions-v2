import { NextRequest, NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Wali Productions Admin"',
    },
  });
}

function timingSafeEqualString(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function isValidAdminRequest(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  const encodedCredentials = authorization.replace("Basic ", "");

  try {
    const decodedCredentials = atob(encodedCredentials);
    const separatorIndex = decodedCredentials.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const suppliedUsername = decodedCredentials.slice(0, separatorIndex);
    const suppliedPassword = decodedCredentials.slice(separatorIndex + 1);

    return (
      timingSafeEqualString(suppliedUsername, username) &&
      timingSafeEqualString(suppliedPassword, password)
    );
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (!isValidAdminRequest(request)) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
