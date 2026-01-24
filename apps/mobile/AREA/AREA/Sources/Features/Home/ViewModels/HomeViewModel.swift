//
//  HomeViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

internal import Combine
import Foundation

@MainActor
class HomeViewModel: ObservableObject {
	@Published var isLoading: Bool = true
	@Published var errorMessage: String?
	var action = HomeAction()

	func retrieveAREA() async -> [AREAItem] {
		isLoading = true
		errorMessage = nil
		defer { isLoading = false }
		do {
			let items: [AREAItem] = try await action.call()
			return items
		} catch {
			print(error)
			errorMessage = error.localizedDescription
			return []
		}
	}

	func updateAreaById(
		id: String,
		name: String,
		description: String,
		isActive: Bool
	) async throws {
		do {
			try await action.updateNameById(
				id: id,
				parameters: UpdateNameModel(name: name)
			)
		} catch {
			throw error
		}

		do {
			try await action.updateDescriptionById(
				id: id,
				parameters: UpdateDescriptionModel(
					description: description.isEmpty ? " " : description
				)
			)
		} catch {
			throw error
		}

		do {
			try await action.updateIsActiveById(
				id: id,
				parameters: UpdateIsActiveModel(is_active: isActive)
			)
		} catch {
			throw error
		}
	}

	func deleteArea(
		id: String
	) async throws {
		try await action.deleteAreaById(id: id)
	}

	func retrieveUserServiceByUserId() async throws -> Int {
		let response = try await action.retrieveUserServiceByUserId()
		return response.data.count
	}
}
