import { Wrench } from "lucide-react";

export default function MaintenancePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-8 flex justify-center">
					<div className="rounded-full bg-orange-100 p-6 dark:bg-orange-900/20">
						<Wrench className="h-16 w-16 text-orange-600 dark:text-orange-400" />
					</div>
				</div>

				<h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
					Modo de Manutenção
				</h1>

				<p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
					Estamos realizando algumas melhorias no sistema para oferecer uma
					experiência ainda melhor.
				</p>

				<p className="text-sm text-gray-500 dark:text-gray-400">
					Voltaremos em breve. Obrigado pela compreensão!
				</p>
			</div>
		</div>
	);
}
