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

	@MainActor
	func connect(to service: Service, store: ServiceStore) async {

		self.isAuthenticating = true

		let authURL = try? BuilderAPI().buildURL(path: "/auth/link/\(service.name)").absoluteString
		let action = ServiceAuthAction(
			serviceName: service.name,
			authURL: authURL ?? ""
		)
		self.currentAuthAction = action

		do {
			let _ = try await action.signIn()

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
