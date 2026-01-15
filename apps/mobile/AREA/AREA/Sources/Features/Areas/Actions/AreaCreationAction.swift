//
//  AreaCreationAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 14/01/2026.
//

internal import AuthenticationServices
internal import Combine
import Foundation
import SimpleKeychain
import UIKit

struct AreaCreationAction {
	var parameters: AreaCreationRequest

	func call() async -> AreaCreationResult {
		do {
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
				method: "POST",
				parameters: parameters,
				token: token
			)

			let (data, urlResponse) = try await URLSession.shared.data(for: request)

			guard let httpResponse = urlResponse as? HTTPURLResponse else {
				return .failure(
					error: "Invalid server response",
					statusCode: -1
				)
			}

			if (200...299).contains(httpResponse.statusCode) {
				return try decodeSuccessResponse(from: data)
			}

			return decodeErrorResponse(
				from: data,
				statusCode: httpResponse.statusCode
			)

		} catch let error as NetworkError {
			return .failure(
				error: error.localizedDescription,
				statusCode: -1
			)
		} catch {
			return .failure(
				error: "An unexpected error occurred: \(error.localizedDescription)",
				statusCode: -1
			)
		}
	}

	// MARK: - Private Methods

	private func decodeSuccessResponse(from data: Data) throws
		-> AreaCreationResult
	{
		let decoder = JSONDecoder()
		decoder.dateDecodingStrategy = .iso8601

		do {
			let response = try decoder.decode(AreaCreationResponse.self, from: data)
			return .success(response)
		} catch {
			throw NetworkError.decodingError(underlyingError: error)
		}
	}

	private func decodeErrorResponse(from data: Data, statusCode: Int)
		-> AreaCreationResult
	{
		let decoder = JSONDecoder()

		if let errorResponse = try? decoder.decode(
			AreaCreationErrorResponse.self,
			from: data
		) {
			let message = errorResponse.message
			return .failure(error: message, statusCode: statusCode)
		}

		if let json = try? JSONSerialization.jsonObject(with: data)
			as? [String: Any]
		{
			if let message = json["message"] as? String {
				return .failure(error: message, statusCode: statusCode)
			}
			if let error = json["error"] as? String {
				return .failure(error: error, statusCode: statusCode)
			}
		}

		let fallbackMessage = HTTPURLResponse.localizedString(
			forStatusCode: statusCode
		)
		return .failure(error: fallbackMessage, statusCode: statusCode)
	}
}
