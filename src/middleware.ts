import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

	// Se o modo de manutenção estiver ativo, redireciona para a página de manutenção
	// Exceto se já estiver na página de manutenção ou em rotas de API necessárias
	if (maintenanceMode) {
		const isMaintenancePage = request.nextUrl.pathname === "/maintenance";
		const isApiRoute = request.nextUrl.pathname.startsWith("/api");

		// Permite acesso à página de manutenção e rotas de API (se necessário)
		if (!isMaintenancePage && !isApiRoute) {
			return NextResponse.redirect(new URL("/maintenance", request.url));
		}
	} else {
		// Se o modo de manutenção não estiver ativo, bloqueia acesso à página de manutenção
		if (request.nextUrl.pathname === "/maintenance") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
