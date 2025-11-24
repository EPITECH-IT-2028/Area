//
//  LoginAction.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct LoginAction {
		
		var parameters: LoginRequest
		
		func call(completion: @escaping (LoginResponseData) -> Void) {
				
				let scheme: String = "https"
				let host: String = "localhost"
				let port: Int = 8080
				let path = "/auth/login"
				
				var components = URLComponents()
				components.scheme = scheme
				components.host = host
				components.port = port
				components.path = path
				
				guard let url = components.url else {
						return
				}
				
				var request = URLRequest(url: url)
				request.httpMethod = "post"
				
				request.addValue("application/json", forHTTPHeaderField: "Content-Type")
				request.addValue("application/json", forHTTPHeaderField: "Accept")
				
				do {
						request.httpBody = try JSONEncoder().encode(parameters)
				} catch {
						// Error: Unable to encode request parameters
				}
				
			let task = URLSession.shared.dataTask(with: request) { data, _, error in
						if let data = data {
								DispatchQueue.main.async {
//									let response = try? JSONDecoder().decode(LoginResponseData.self, from: data)
									let response = LoginResponseData(success: true, data: nil, message: nil)
									completion(response)
									print(response)
//									if let response = response {
//											completion(response)
//									} else {
//											// Error: Unable to decode response JSON
//									}
								}
						} else {
								// Error: API request failed

								if let error = error {
										print("Error: \(error.localizedDescription)")
								}
						}
				}
				task.resume()
		}
}
