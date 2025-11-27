//
//  UpdateServerPathView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 26/11/2025.
//

import Foundation
import SwiftUI

/// View that allows users to update the server connection path
/// Users can configure the scheme (http/https), host (domain/IP), and port
struct UpdateServerPathView: View {
	@ObservedObject var viewModel: UpdateServerPathViewModel =
		UpdateServerPathViewModel()
	@Environment(\.dismiss) var dismiss

	var body: some View {
		VStack {
			Spacer()

			Text(
				LocalizedStringResource.updateServerPathExplainFormatTitle
			)
			.font(.system(size: 14, weight: .light, design: .default))

			TextField(
				LocalizedStringResource.updateServerPathServerSchemeTitle,
				text: $viewModel.serverScheme
			)
			.autocapitalization(.none)
			.disableAutocorrection(true)
			.padding(.top, 20)
			.font(.defaultFont)
			.foregroundStyle(Color(.black))

			Divider()

			TextField(
				LocalizedStringResource.updateServerPathServerHostTitle,
				text: $viewModel.serverHost
			)
			.autocapitalization(.none)
			.disableAutocorrection(true)
			.padding(.top, 20)
			.font(.defaultFont)
			.foregroundStyle(Color(.black))

			Divider()

			TextField(
				LocalizedStringResource.updateServerPathServerPortTitle,
				text: $viewModel.serverPort
			)
			.autocapitalization(.none)
			.disableAutocorrection(true)
			.padding(.top, 20)
			.font(.defaultFont)
			.foregroundStyle(Color(.black))

			Divider()

			Text(
				"\(LocalizedStringResource.updateServerPathCurrentPathTitle) \(viewModel.createServerFullPath())"
			)
			.autocapitalization(.none)
			.disableAutocorrection(true)
			.padding(.top, 20)
			.font(.system(size: 14, weight: .light, design: .default))
			.foregroundStyle(Color(.black))

			if let errorMessage = viewModel.errorMessage {
				Text(errorMessage)
					.foregroundStyle(Color(.red))
					.padding(20)
					.font(.defaultFont)
			}

			Spacer()

			Button(
				action: {
					viewModel.isSaving = true
				},
				label: {
					Text("Save new server path")
						.font(.system(size: 24, weight: .bold))
						.frame(maxWidth: .infinity, maxHeight: 60)
						.foregroundColor(.white)
						.background(Color.blue)
						.cornerRadius(10)
				}
			)
			.alert(
				LocalizedStringResource.updateServerPathSaveAlertMessageTitle,
				isPresented: $viewModel.isSaving
			) {
				Button(
					LocalizedStringResource.updateServerPathCancelTitle,
					role: .cancel
				) {
					viewModel.reset()
					dismiss()
				}
				Button(
					LocalizedStringResource.updateServerPathSaveTitle,
					role: .destructive
				) {
					do {
						try viewModel.save()
						dismiss()
					} catch let error {
						print(error)
					}
				}
			}

		}
		.toolbar(.hidden, for: .tabBar)
		.padding(30)
		.navigationTitle(LocalizedStringResource.settingsUpdateServerPathTitle)
	}
}

#Preview {
	UpdateServerPathView()
}
