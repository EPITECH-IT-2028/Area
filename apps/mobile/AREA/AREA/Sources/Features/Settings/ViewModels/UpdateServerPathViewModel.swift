//
//  UpdateServerPathViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

internal import Combine
import Foundation

class UpdateServerPathViewModel: ObservableObject {
	@Published var serverScheme: String = Settings.serverScheme
	@Published var serverHost: String = Settings.serverHost
	@Published var serverPort: String = String(Settings.serverPort)
	@Published var isSaving: Bool = false
	@Published var errorMessage: String? = nil
	@Published var isErrorVisible: Bool = false

	init() {}

	func toggleIsSaving() {
		isSaving = !isSaving
	}

	func save() throws {
		if serverScheme != Constants.httpString
			&& serverScheme != Constants.httpsString
		{
			isErrorVisible = true
			errorMessage = "Invalid scheme: \(serverScheme) is not http or https"
			throw NSError(domain: "Invalid scheme: \(serverScheme) is not http or https", code: 0, userInfo: nil)
		}
		if serverHost == "" {
			isErrorVisible = true
			errorMessage = "Invalid host"
			throw NSError(domain: "Invalid host", code: 0, userInfo: nil)
		}
		guard !serverPort.isEmpty, let port = Int(serverPort) else {
			isErrorVisible = true
			errorMessage = "Invalid port"
			throw NSError(domain: "Invalid port", code: 0, userInfo: nil)
		}
		if port <= Constants.portMin || port > Constants.portMax {
			isErrorVisible = true
			errorMessage = "Invalid port"
			throw NSError(domain: "Invalid port", code: 0, userInfo: nil)
		}
		isErrorVisible = false
		errorMessage = nil
		Settings.serverHost = serverHost
		Settings.serverPort = port
		Settings.serverScheme = serverScheme
	}

	func createServerFullPath() -> String {
		"\(serverScheme)://\(serverHost):\(serverPort)"
	}
}
