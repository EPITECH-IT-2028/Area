//
//  SplashScreenAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 08/12/2025.
//

import Foundation
import SimpleKeychain

struct SplashScreenAction {
	func verifyToken() async throws -> Bool {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.getUserPath)
		guard
			let tokenData = try? KeychainManager.shared.keychain.data(
				forKey: Constants.keychainJWTKey
			),
			let token = String(data: tokenData, encoding: .utf8)
		else {
			throw NetworkError.missingToken
		}

		let request = try builder.buildRequest(
			url: url,
			method: "GET",
			token: token
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "SplashScreenAction",
					code: -1,
					userInfo: [
						NSLocalizedDescriptionKey: "Response is not an HTTP response"
					]
				)
			)
		}
		guard response.statusCode == 200 else {
			let errorMessage = parseErrorMessage(
				from: data,
				statusCode: response.statusCode
			)
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "SplashScreenAction",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
		return true
	}

	private func parseErrorMessage(from data: Data, statusCode: Int) -> String {
		if let json = try? JSONSerialization.jsonObject(with: data)
			as? [String: Any]
		{
			if let message = json["message"] as? String {
				return message
			}
			if let error = json["error"] as? String {
				return error
			}
			if let errorDescription = json["error_description"] as? String {
				return errorDescription
			}
		}
		return HTTPURLResponse.localizedString(forStatusCode: statusCode)
	}
}
