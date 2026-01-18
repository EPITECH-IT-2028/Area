//
//  ServiceAuthAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 15/01/2026.
//

internal import AuthenticationServices
internal import Combine
import Foundation
import SimpleKeychain
import UIKit

class ServiceAuthAction: NSObject, ObservableObject {
	@Published var isAuthenticated = false
	@Published var errorMessage: String?
	@Published var isLoading = false
	private var session: ASWebAuthenticationSession?

	private let serviceName: String
	private let authURL: String

	init(serviceName: String, authURL: String) {
		self.serviceName = serviceName
		self.authURL = authURL
		super.init()
	}

	func signIn() async throws -> String {
		return try await withCheckedThrowingContinuation { continuation in
			DispatchQueue.main.async {
				self.isLoading = true
			}

			guard var components = URLComponents(string: self.authURL) else {
				DispatchQueue.main.async {
					self.errorMessage = "Invalid URL"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "ServiceAuthManager",
						code: -1,
						userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]
					)
				)
				return
			}

			components.queryItems = [
				URLQueryItem(
					name: Constants.keyForOauth2,
					value: Constants.valueForOauth2
				)
			]

			if let token = AuthState.shared.getAuthToken() {
				var queryItems = components.queryItems ?? []
				queryItems.append(URLQueryItem(name: "token", value: token))
				components.queryItems = queryItems
			}

			guard let finalAuthURL = components.url else {
				DispatchQueue.main.async {
					self.errorMessage = "Invalid URL"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "ServiceAuthManager",
						code: -1,
						userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]
					)
				)
				return
			}

			self.session = ASWebAuthenticationSession(
				url: finalAuthURL,
				callbackURLScheme: Constants.callbackURLScheme
			) { callbackURL, error in
				defer { self.session = nil }

				if let error = error {
					DispatchQueue.main.async {
						self.errorMessage = error.localizedDescription
						self.isLoading = false
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
					DispatchQueue.main.async {
						self.errorMessage = "Missing token in callback URL"
						self.isLoading = false
					}
					continuation.resume(
						throwing: NSError(
							domain: "ServiceAuthManager",
							code: -2,
							userInfo: [
								NSLocalizedDescriptionKey: "Missing token in callback URL"
							]
						)
					)
					return
				}

				DispatchQueue.main.async {
					do {
						try AuthState.shared.saveToken(
							token,
							for: self.serviceName
						)
						self.isAuthenticated = true
						self.isLoading = false
						continuation.resume(returning: token)
					} catch {
						self.errorMessage = "Failed to save authentication"
						self.isLoading = false
						continuation.resume(
							throwing: NSError(
								domain: "ServiceAuthManager",
								code: -3,
								userInfo: [
									NSLocalizedDescriptionKey: "Failed to save authentication"
								]
							)
						)
					}
				}
			}

			self.session?.presentationContextProvider = self
			if self.session?.start() != true {
				DispatchQueue.main.async {
					self.errorMessage = "Failed to start authentication session"
					self.isLoading = false
				}
				continuation.resume(
					throwing: NSError(
						domain: "ServiceAuthManager",
						code: -4,
						userInfo: [
							NSLocalizedDescriptionKey:
								"Failed to start authentication session"
						]
					)
				)
			}
		}
	}
}

extension ServiceAuthAction: ASWebAuthenticationPresentationContextProviding {
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

