//
//  GitHubAuthAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 05/12/2025.
//

internal import AuthenticationServices
internal import Combine
import Foundation

class GitHubAuthAction: NSObject, ObservableObject {
	@Published var isAuthenticated = false
	@Published var errorMessage: String?
	@Published var isLoading = false
	private var session: ASWebAuthenticationSession?

	override init() {
		super.init()
	}

	func signIn() async throws -> String {
		return try await withCheckedThrowingContinuation { continuation in
			isLoading = true
			var components = URLComponents(string: Constants.githubOAuth2ServerPath)!
			components.queryItems = [
				URLQueryItem(
					name: Constants.keyForOauth2,
					value: Constants.valueForOauth2
				)
			]

			guard let authURL = components.url else {
				let error = NSError(
					domain: "GitHubAuthAction",
					code: -1,
					userInfo: [NSLocalizedDescriptionKey: "Invalid auth URL"]
				)
				self.errorMessage = error.localizedDescription
				continuation.resume(throwing: error)
				return
			}

			self.session = ASWebAuthenticationSession(
				url: authURL,
				callbackURLScheme: "AREA"
			) { callbackURL, error in
				defer {
					self.session = nil
				}

				if let error = error {
					DispatchQueue.main.async {
						self.errorMessage = error.localizedDescription
					}
					continuation.resume(throwing: error)
					return
				}

				guard let callbackURL = callbackURL,
					let components = URLComponents(
						url: callbackURL,
						resolvingAgainstBaseURL: true
					),
					let tokenItem = components.queryItems?.first(where: {
						$0.name == Constants.tokenString
					}),
					let token = tokenItem.value
				else {
					let error = NSError(
						domain: "GitHubAuthAction",
						code: -2,
						userInfo: [NSLocalizedDescriptionKey: "Token missing in callback"]
					)
					DispatchQueue.main.async {
						self.errorMessage = error.localizedDescription
					}
					continuation.resume(throwing: error)
					return
				}

				DispatchQueue.main.async {
					do {
						try AuthState.shared.authenticate(accessToken: token)
						self.isAuthenticated = true
						self.isLoading = false
					} catch {
						self.errorMessage = "Failed to save authentication"
					}
				}
			}
			self.session?.presentationContextProvider = self
			self.session?.start()
		}
	}
}

extension GitHubAuthAction: ASWebAuthenticationPresentationContextProviding {
	func presentationAnchor(for session: ASWebAuthenticationSession)
		-> ASPresentationAnchor
	{
		if let windowScene = UIApplication.shared.connectedScenes
			.compactMap({ $0 as? UIWindowScene })
			.first
		{
			return ASPresentationAnchor(windowScene: windowScene)
		}
		return ASPresentationAnchor()
	}
}
