//
//  ResetAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

import Foundation


struct ResetAction {

	var parameters: ResetRequest

	func call() async throws -> ResetResponseData {
		let builder = BuilderAPI()
		let url = try builder.buildURL()
		let request = try builder.buildRequest(url: url, method: "POST", parameters: parameters)

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
		return try decoder.decode(ResetResponseData.self, from: data)
	}
}
