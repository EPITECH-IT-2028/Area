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

	func signIn() {
		var components = URLComponents(string: Constants.githubOAuth2ServerPath)!
		components.queryItems = [
			URLQueryItem(
				name: Constants.keyForOauth2,
				value: Constants.valueForOauth2
			)
		]

		guard let authURL = components.url else { return }

		print(authURL)
		self.session = ASWebAuthenticationSession(
			url: authURL,
			callbackURLScheme: "AREA"
		) { callbackURL, error in
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
				return
			}
			DispatchQueue.main.async {
				
				self.isAuthenticated = true
				try? AuthState.shared.authenticate(accessToken: token)
			}
		}
		self.session?.presentationContextProvider = self
		self.session?.start()
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
		fatalError(String(localized: LocalizedStringResource.oauth2ErrorPresentationArchor))
	}
}
