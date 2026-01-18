//
//  ServicesCollectionView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 15/01/2026.
//

import SwiftUI

struct ServiceCollectionView: View {
	@EnvironmentObject var serviceStore: ServiceStore
	var searchText: String
	var allCards: [CardItem]

	@ObservedObject var viewModel: ServicesViewModel

	var body: some View {
		let filteredCards =
			searchText.isEmpty
			? allCards
			: allCards.filter { card in
				card.title.localizedCaseInsensitiveContains(searchText)
			}

		ScrollView {
			VStack(spacing: 20) {
				ForEach(filteredCards, id: \.id) { card in
					if let service = serviceStore.services.first(where: {
						$0.displayName == card.title
					}) {
						Button {
							Task {
								await viewModel.connect(to: service, store: serviceStore)
							}
						} label: {
							TableView(item: card)
								.opacity(viewModel.isAuthenticating ? 0.5 : 1.0)
						}
						.disabled(viewModel.isAuthenticating)
					} else {
						TableView(item: card)
					}
				}
			}
			.padding()
		}
		.background(Color.backgroundColor)
		.alert(
			LocalizedStringResource.servicesAlertConnexion,
			isPresented: $viewModel.showAuthAlert
		) {
			Button(LocalizedStringResource.okTitle, role: .cancel) {}
		} message: {
			if let error = viewModel.errorMessage {
				Text(error)
			} else if let success = viewModel.authSuccessMessage {
				Text(success)
			}
		}
	}
}
