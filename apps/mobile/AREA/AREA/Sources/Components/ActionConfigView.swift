//
//  ActionConfigView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

import SwiftUI

struct ActionConfigView: View {
	let action: ServiceAction
	@ObservedObject var viewModel: AreaCreationViewModel
	@Binding var navigationPath: NavigationPath

	var body: some View {
		VStack {
			DynamicFormView(
				schema: action.configSchema,
				values: $viewModel.actionConfigValues
			)

			Button(action: {
				if viewModel.submitActionConfig(action: action) {
					navigationPath.removeLast(navigationPath.count)
				}
			}) {
				Text(LocalizedStringResource.areaCreationNextChooseReactionTitle)
					.frame(maxWidth: .infinity)
					.padding()
			}
			.background(
				viewModel.validateActionConfig(for: action) ? Color.blue : Color.gray
			)
			.foregroundColor(.white)
			.cornerRadius(10)
			.disabled(!viewModel.validateActionConfig(for: action))
			.padding()

			if let errorMessage = viewModel.errorMessage {
				Text(errorMessage)
					.foregroundColor(.red)
					.font(.caption)
					.padding(.horizontal)
			}
		}
		.navigationTitle(
			"\(LocalizedStringResource.areaCreationConfigTitle) \(action.name)"
		)
	}
}
