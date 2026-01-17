internal import Combine
import SwiftUI

class ServicesViewModel: ObservableObject {
	@Published var selectedServices: String? = nil
	@Published var isLoggedIn: Bool = false
	@Published var errorMessage: String? = nil

	@Published var currentAuthAction: ServiceAuthAction?
	@Published var showAuthAlert: Bool = false
	@Published var authSuccessMessage: String?
	@Published var isAuthenticating: Bool = false

	var googleAuthAction = GoogleAuthAction()
	var githubAuthAction = GitHubAuthAction()

	@MainActor
	func connect(to service: Service, store: ServiceStore) async {
		

		self.isAuthenticating = true

		let action = ServiceAuthAction(
			serviceName: service.name,
			authURL: "http://localhost:8080/auth/link/\(service.name)"
		)
		self.currentAuthAction = action

		do {
			let _ = try await action.signIn()

			if let index = store.services.firstIndex(where: { $0.id == service.id }) {
				store.services[index].isAuthenticated = true
			}

			self.authSuccessMessage =
				"Connexion réussie avec \(service.displayName) !"
			self.errorMessage = nil
			self.showAuthAlert = true

		} catch {
			self.errorMessage = error.localizedDescription
			self.authSuccessMessage = nil
			self.showAuthAlert = true
		}

		self.isAuthenticating = false
		self.currentAuthAction = nil
	}
}
