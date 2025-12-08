//
//  GoogleAuthAuthAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 05/12/2025.
//

internal import AuthenticationServices
internal import Combine
import Foundation

class GoogleAuthAction: NSObject, ObservableObject {
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
			var components = URLComponents(string: Constants.googleOAuth2ServerPath)!
			components.queryItems = [
				URLQueryItem(
					name: Constants.keyForOauth2,
					value: Constants.valueForOauth2
				)
			]

			guard let authURL = components.url else {
				self.errorMessage = "Invalid URL"
				continuation.resume(throwing: NSError(domain: "GoogleAuthAction", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]))
				return
			}

			self.session = ASWebAuthenticationSession(
				url: authURL,
				callbackURLScheme: Constants.callbackURLScheme
			) { callbackURL, error in
				defer { self.session = nil }

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
					  let token = tokenItem.value else {
					DispatchQueue.main.async {
						self.errorMessage = "Missing token in callback URL"
					}
					continuation.resume(throwing: NSError(domain: "GoogleAuthAction", code: -2, userInfo: [NSLocalizedDescriptionKey: "Missing token in callback URL"]))
					return
				}

				DispatchQueue.main.async {
					do {
						try AuthState.shared.authenticate(accessToken: token)
						self.isAuthenticated = true
						self.isLoading = false
					} catch {
						self.errorMessage = "Failed to save authentication"
						self.isLoading = false
					}
				}
				continuation.resume(returning: token)
			}
			self.session?.presentationContextProvider = self
			self.session?.start()
		}
	}
}

extension GoogleAuthAction: ASWebAuthenticationPresentationContextProviding {
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
