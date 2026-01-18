//
//  HomeAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct HomeAction {

	func deleteAreaById(id: String)
		async throws
	{
		let builder = BuilderAPI()
		let path = "\(Constants.createAREAsPath)/\(id)/"
		let url = try builder.buildURL(path: path)
		let request = try builder.buildRequest(
			url: url,
			method: "DELETE",
			token: AuthState.shared.getAuthToken()
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "DeleteArea",
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
					domain: "DeleteArea",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
	}
	
	func updateNameById(id: String, parameters: UpdateNameModel)
		async throws
	{
		let builder = BuilderAPI()
		let path = "\(Constants.createAREAsPath)/\(id)/name"
		let url = try builder.buildURL(path: path)
		let request = try builder.buildRequest(
			url: url,
			method: "PATCH",
			parameters: parameters,
			token: AuthState.shared.getAuthToken()
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "UpdateName",
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
					domain: "UpdateName",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
	}
	
	func updateDescriptionById(id: String, parameters: UpdateDescriptionModel)
		async throws
	{
		let builder = BuilderAPI()
		let path = "\(Constants.createAREAsPath)/\(id)/description"
		let url = try builder.buildURL(path: path)
		let request = try builder.buildRequest(
			url: url,
			method: "PATCH",
			parameters: parameters,
			token: AuthState.shared.getAuthToken()
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "UpdateDescription",
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
					domain: "UpdateDescription",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
	}
	
	func updateIsActiveById(id: String, parameters: UpdateIsActiveModel)
		async throws
	{
		let builder = BuilderAPI()
		let path = "\(Constants.createAREAsPath)/\(id)/isActive"
		let url = try builder.buildURL(path: path)
		let request = try builder.buildRequest(
			url: url,
			method: "PATCH",
			parameters: parameters,
			token: AuthState.shared.getAuthToken()
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "UpdateIsActive",
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
					domain: "UpdateIsActive",
					code: response.statusCode,
					userInfo: [
						NSLocalizedDescriptionKey: errorMessage,
						"statusCode": response.statusCode,
					]
				)
			)
		}
	}
	
	/// This function is used to fetch the user's AREAs
	func call() async throws -> [AREAItem] {
		let builder = BuilderAPI()
		let url = try builder.buildURL(path: Constants.createAREAsPath)
		let request = try builder.buildRequest(
			url: url,
			method: "GET",
			token: AuthState.shared.getAuthToken()
		)

		let (data, urlResponse) = try await URLSession.shared.data(for: request)

		guard let response = urlResponse as? HTTPURLResponse else {
			throw NetworkError.badURLResponse(
				underlyingError: NSError(
					domain: "HomeAction",
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
					domain: "HomeAction",
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
			let homeModel = try decoder.decode(HomeModel.self, from: data)

			let areaItems = homeModel.data.map { homeData in
				AREAItem(from: homeData)
			}

			return areaItems
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
