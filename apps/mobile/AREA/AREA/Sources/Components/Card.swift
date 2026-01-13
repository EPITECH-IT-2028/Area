//
//  Card.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import SwiftUI

struct CardItem: Identifiable {
	let id = UUID()
	let title: String
	let description: String?
	let iconURL: URL?
}
