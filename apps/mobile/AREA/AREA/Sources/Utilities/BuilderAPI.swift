//
//  BuilderAPI.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

import Foundation

struct BuilderAPI {
	func buildURL(path: String) throws -> URL {
		let scheme = SettingsUD.serverScheme
		let host = SettingsUD.serverHost
		let port = SettingsUD.serverPort

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

	func buildRequest<T: Encodable>(
		url: URL,
		method: String,
		parameters: T
	)
		throws -> URLRequest
	{
		var request = URLRequest(url: url)
		request.httpMethod = method
		request.addValue("application/json", forHTTPHeaderField: "Content-Type")
		request.addValue("application/json", forHTTPHeaderField: "Accept")
		do {
			request.httpBody = try JSONEncoder().encode(parameters)
		} catch {
			throw NetworkError.encodingFailed(underlyingError: error)
		}
		return request
	}

	func buildRequest(
		url: URL,
		method: String
	)
		throws -> URLRequest
	{
		var request = URLRequest(url: url)
		request.httpMethod = method
		request.addValue("application/json", forHTTPHeaderField: "Content-Type")
		request.addValue("application/json", forHTTPHeaderField: "Accept")
		return request
	}
}
