//
//  ServicesManager.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

internal import Combine
import Foundation
import SimpleKeychain

class ServiceStore: ObservableObject {
	static let shared = ServiceStore()

	@Published var services: [Service] = []
	@Published var isLoading: Bool = false

	func fromServiceToCardItem() -> [CardItem] {
		let cardItems = services.map { service in
			return CardItem(
				title: service.displayName,
				description: nil,
				iconURL: service.iconUrl
			)
		}
		return cardItems
	}

	func fromActionsToCard(serviceName: String) -> [CardItem] {
		guard let foundService = services.first(where: { $0.name == serviceName }) else {
			return []
		}
		return foundService.actions.map { action in
			CardItem(
				title: action.name,
				description: action.description,
				iconURL: nil
			)
		}
	}

	func fetchServices() async throws -> Bool {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.aboutJsonPath)
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

		self.isLoading = true

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			self.isLoading = false
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
			self.isLoading = false
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
			self.services = decodedResponse.server.services
			self.isLoading = false
			return true
		} catch {
			self.isLoading = false
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
