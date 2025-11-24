//
//  LoginAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct LoginAction {

	var parameters: LoginRequest

	func call() async throws -> LoginResponseData {
		let url = try buildURL()
		let request = try buildRequest(url: url)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse,
			response.statusCode == 200
		else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "LoginAction",
					code: (urlResponse as? HTTPURLResponse)?.statusCode ?? -1,
					userInfo: [NSLocalizedDescriptionKey: "Invalid HTTP Response"]
				)
			)
		}

		let decoder = JSONDecoder()
		decoder.keyDecodingStrategy = .convertFromSnakeCase
		return try decoder.decode(LoginResponseData.self, from: data)
	}

	private func buildURL() throws -> URL {
		let scheme = Constants.databaseScheme
		let host = Constants.databaseHost
		let port = Constants.databasePort
		let path = Constants.loginDBPath

		var components = URLComponents()
		components.scheme = scheme
		components.host = host
		components.port = port
		components.path = path

		guard let url = components.url else {
			throw NetworkError.urlBuildFailed
		}

		return url
	}

	private func buildRequest(url: URL) throws -> URLRequest {
		var request = URLRequest(url: url)
		request.httpMethod = "POST"
		request.addValue("application/json", forHTTPHeaderField: "Content-Type")
		request.addValue("application/json", forHTTPHeaderField: "Accept")

		do {
			request.httpBody = try JSONEncoder().encode(parameters)
		} catch {
			throw NetworkError.encodingFailed(underlyingError: error)
		}

		return request
	}
}
