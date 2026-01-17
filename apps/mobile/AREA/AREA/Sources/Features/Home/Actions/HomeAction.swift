//
//  HomeAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

internal import Combine
import Foundation
import SimpleKeychain

struct HomeAction {
	@Published var isLoading: Bool = false

	func retrieveUserAREA() async throws -> [AREAItem] {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.createAREAsPath)
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

		await MainActor.run { self.isLoading = true }
		defer {
			Task { @MainActor in
				self.isLoading = false
			}
		}

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "ServiceStore",
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
					domain: "ServiceStore",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}

		do {
			let decoder = JSONDecoder()
			decoder.keyDecodingStrategy = .convertFromSnakeCase

			let decodedResponse = try decoder.decode(
				SplashScreenResponse.self,
				from: data
			)
		} catch {
			throw NetworkError.decodingError(
				underlyingError: error
			)
		}
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
