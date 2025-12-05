//
//  RegisterAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct RegisterAction {

	var parameters: RegisterRequestPayload

	/// This function is used to register the user using the name, email and password
	func call() async throws -> RegisterResponsePayload {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.registerServerPath)
		let request = try builder.buildRequest(
			url: url,
			method: "POST",
			parameters: parameters
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "RegisterAction",
					code: -1,
					userInfo: [
						NSLocalizedDescriptionKey: "Response is not an HTTP response"
					]
				)
			)
		}

		guard (200...299).contains(response.statusCode) else {
			let errorMessage = parseErrorMessage(
				from: data,
				statusCode: response.statusCode
			)
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "RegisterAction",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
		let decoder = JSONDecoder()
		decoder.keyDecodingStrategy = .convertFromSnakeCase
		do {
			return try decoder.decode(RegisterResponsePayload.self, from: data)
		} catch {
			throw NetworkError.decodingError(
				underlyingError: error
			)
		}
	}

	/// This function is used to parse the error message in the HTTP response to make the error debugging easier
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
