//
//  ReactionConfigView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

import SwiftUI

struct ReactionConfigView: View {
	let reaction: ServiceAction
	@ObservedObject var viewModel: AreaCreationViewModel
	@Binding var navigationPath: NavigationPath

	var body: some View {
		VStack {
			DynamicFormView(
				schema: reaction.configSchema,
				values: $viewModel.reactionConfigValues
			)

			Button(action: {
				if viewModel.submitReactionConfig(reaction: reaction) {
					Task {
						let success = await viewModel.createArea()

						await MainActor.run {
							if success {
								viewModel.alertTitle = String(
									localized: LocalizedStringResource.successTitle
								)
								viewModel.alertMessage = String(
									localized: LocalizedStringResource
										.areaCreationAreaCreatedTitle
								)
							} else {
								viewModel.alertTitle = String(
									localized: LocalizedStringResource.errorTitle
								)
								viewModel.alertMessage = String(
									localized: LocalizedStringResource
										.areaCreationErrorAreaCreationTitle
								)
							}

							viewModel.showAlert = true
						}
					}
				}
			}) {
				if viewModel.isSubmitting {
					ProgressView()
						.progressViewStyle(CircularProgressViewStyle(tint: .white))
						.frame(maxWidth: .infinity)
						.padding()
				} else {
					Text(LocalizedStringResource.areaCreationCreateAreaTitle)
						.bold()
						.frame(maxWidth: .infinity)
						.padding()
				}
			}
			.background(
				viewModel.isSubmitting
					? Color.gray
					: (viewModel.validateReactionConfig(for: reaction)
						 ? Color.mainColor : Color.gray)
			)
			.foregroundColor(.white)
			.cornerRadius(10)
			.disabled(
				viewModel.isSubmitting
					|| !viewModel.validateReactionConfig(for: reaction)
			)
			.padding()

			if let errorMessage = viewModel.errorMessage {
				Text(errorMessage)
					.foregroundColor(.red)
					.font(.caption)
					.padding(.horizontal)
			}
		}
		.navigationBarTitleDisplayMode(.inline)
		.navigationTitle(
			"\(LocalizedStringResource.areaCreationConfigTitle) \(reaction.name)"
		)
		.alert(viewModel.alertTitle, isPresented: $viewModel.showAlert) {
			Button(LocalizedStringResource.okTitle) {
				viewModel.resetAll()
				navigationPath.removeLast(navigationPath.count)
			}
		} message: {
			Text(viewModel.alertMessage)
		}
	}
}
