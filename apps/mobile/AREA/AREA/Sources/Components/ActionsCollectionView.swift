//
//  ActionsCollectionView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 12/01/2026.
//

import SwiftUI

struct ActionsCollectionView: View {
	@State private var selectedCardIndex: Int? = nil
	@EnvironmentObject var serviceStore: ServiceStore

	var serviceName: String
	var searchText: String

	var body: some View {
		let allCards = serviceStore.fromActionsToCard(serviceName: serviceName)

		let filteredCards =
			searchText.isEmpty
			? allCards
			: allCards.filter { card in
				card.title.localizedCaseInsensitiveContains(searchText)
			}

		ScrollView {
			if filteredCards.isEmpty {
				VStack(spacing: 20) {
					Image(systemName: "tray")
						.font(.system(size: 50))
						.foregroundStyle(.gray)
					Text(
						searchText.isEmpty
							? LocalizedStringResource.actionsNoActionsTitle
							: LocalizedStringResource.actionsNoResultTitle
					)
					.font(.headline)
					.foregroundStyle(.gray)
				}
				.frame(maxWidth: .infinity, maxHeight: .infinity)
				.padding(.top, 50)
			} else {
				VStack(spacing: 20) {
					ForEach(filteredCards) { card in
						// TODO: Add navigation to reactions
						TableView(item: card)
					}
				}
				.padding()
			}
		}
		.navigationTitle(LocalizedStringResource.actionsTitle)
		.background(Color(UIColor.systemGroupedBackground))
	}
}
