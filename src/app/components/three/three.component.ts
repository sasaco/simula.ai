import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from './scene.service';

@Component({
  selector: 'app-three',
  standalone: true,
  imports: [],
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss'
})
export class ThreeComponent implements AfterViewInit {

  @ViewChild("myCanvas", { static: true }) private canvasRef!: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private scene: SceneService) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scene.OnInit(this.canvas);

      const geometry = new THREE.BoxGeometry(10, 10, 10);
      const material = new THREE.MeshNormalMaterial();
      const box = new THREE.Mesh(geometry, material);
      this.scene.add(box);

      this.render();
    }
  }

  // レンダリングする
  private render(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("DOMContentLoaded", () => {
        this.scene.render();
      });
    });
  }

  // マウスクリック時のイベント
  @HostListener("pointerdown", ["$event"])
  public onMouseDown(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    // this.three.detectObject(mouse, "click");
  }

  // マウスクリック時のイベント
  // @HostListener("pointerup", ["$event"])
  public onMouseUp(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    // this.three.detectObject(mouse, "select");
  }

  // マウス移動時のイベント
  // @HostListener("mousemove", ["$event"])
  public onMouseMove(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    // this.three.detectObject(mouse, "hover");
  }

  // マウス位置とぶつかったオブジェクトを検出する
  private getMousePosition(event: MouseEvent): THREE.Vector2 {
    event.preventDefault();
    // const rect = this.scene.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    // mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    // mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return mouse;
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.scene.onResize(this.canvas);
  }

}
